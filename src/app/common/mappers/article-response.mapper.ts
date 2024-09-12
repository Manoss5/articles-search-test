import { Article } from '../types/article';

const ArticleResponseMapper = (data: {
  id: number;
  type: string;
  attributes: {
    title: string;
    preview: string;
    description: string;
    body: string;
  };
}): Article => {
  return {
    id: data.id,
    title: data.attributes.title,
    preview: data.attributes.preview,
    description: data.attributes.description,
    body: data.attributes.body,
  };
};

export default ArticleResponseMapper;
