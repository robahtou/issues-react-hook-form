'use client';

import { useFormStatus } from 'react-dom';


function SubmitButton({ label='submit' }) {
  const { pending } = useFormStatus();

  return (
    <button type='submit'>
      { pending
        ? 'Submitting...'
        : label
      }
    </button>
  );
}


export default SubmitButton;
