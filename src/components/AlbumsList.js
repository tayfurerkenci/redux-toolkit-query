import { useAddAlbumMutation, useFetchAlbumsQuery } from '../store/index';
import { Skeleton } from '../elements/Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from '../elements/Button';

const AlbumsList = ({ user }) => {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;
      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album.
        </ExpandablePanel>
      );
    });
  }

  return (
    <>
      <div>
        Albums for {user.name}
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </>
  );
};

export default AlbumsList;
