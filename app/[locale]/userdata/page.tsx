import CompToolbar from './components/Toolbar';
import CompSearchResult from './components/SearchResult';
import CompPaginationRounded from './components/PaginationRounded';

export default function PagePublished() {
  return (
    <main className="page-metadata">
      <CompToolbar />
      <CompSearchResult />
      <CompPaginationRounded />
    </main>
  );
}
