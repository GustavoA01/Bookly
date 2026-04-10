import { ListDetailsContent } from '@/src/features/ListDetails/container/ListDetailsContent';

const ListDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <ListDetailsContent id={id} />;
};

export default ListDetailsPage;
