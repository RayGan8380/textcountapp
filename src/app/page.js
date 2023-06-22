import { gql, GraphQLClient } from 'graphql-request';
import DragDropFile from '@/components/dragAndDropFile';

export default function Home() {
  return (
    <main >
      <DragDropFile />
    </main>
  );
}
