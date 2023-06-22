import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DragDropFiles from '../../components/dragAndDropFile';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = { userAgent: 'node.js' };

//Test whether files are set correctly when dropped:
test('sets files when dropped', () => {
    const files = [new File(['test content'], 'test.txt', { type: 'text/plain' })];
    const { getByText } = render(<DragDropFiles />);
    
    const dropZone = getByText('Drag and drop your files to upload');
    fireEvent.drop(dropZone, { dataTransfer: { files } });
  
    expect(screen.getByText('test.txt')).toBeInTheDocument();
  });
  
  //Test whether file selection is triggered correctly:
  test('triggers file selection', () => {
    const { getByText } = render(<DragDropFiles />);
    const selectButton = getByText('Select Files');
  
    const inputRef = createRef();
    fireEvent.click(selectButton, { target: { files: [new File(['test content'], 'test.txt', { type: 'text/plain' })] }, ref: inputRef });
  
    expect(inputRef.current.files[0].name).toBe('test.txt');
  });

  //Test the submission of files and results display:
  test('submits files and displays results', async () => {
    const files = [new File(['test content'], 'test.txt', { type: 'text/plain' })];
    uploadFiles.mockResolvedValueOnce([{ name: 'test.txt', url: 'file-url' }]);
    countWords.mockReturnValueOnce([['User1', 10], ['User2', 5]]);
    
    const { getByText } = render(<DragDropFiles />);
    
    const dropZone = getByText('Drag and drop your files to upload');
    fireEvent.drop(dropZone, { dataTransfer: { files } });
  
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      expect(uploadFiles).toHaveBeenCalledWith(files);
      expect(readFileContent).toHaveBeenCalledWith('file-url');
      expect(countWords).toHaveBeenCalledWith('test content');
      expect(screen.getByText('test.txt')).toBeInTheDocument();
      expect(screen.getByText('1. User1 - 10 words')).toBeInTheDocument();
      expect(screen.getByText('2. User2 - 5 words')).toBeInTheDocument();
    });
  });
  
  