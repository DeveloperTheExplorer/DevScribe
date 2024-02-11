import { queryParam } from 'sveltekit-search-params';


const encode = (value: number[]) => {
  return value.join('.');
}

const decode = (value: string | null) => {
  return value ? value.split('.').map(n => parseInt(n)) : [0, 0];
};

export const lessonIndex = queryParam('current', { encode, decode });

export const updateLessonIndex = (index: number[]) => {
  lessonIndex.set(index);
};