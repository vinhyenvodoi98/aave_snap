import { ComponentProps } from 'react';

export const CustomButton = (props: ComponentProps<'button'>) => {
  return <button {...props} className='btn btn-outline text-white'></button>;
};
