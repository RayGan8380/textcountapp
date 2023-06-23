const uploadFiles = async (files) => {
    const validFiles = Array.from(files).filter((file) => file.type === 'text/plain');
  
    if (validFiles.length === 0) {
      window.alert('Only .txt files are allowed');
      return [];
    }
  
    const uploadedFiles = [];
  
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-uploads');
  
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dixygxk3k/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          uploadedFiles.push({
            name: file.name,
            url: data.secure_url,
          });
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    return uploadedFiles;
  };
  
export default uploadFiles;
  