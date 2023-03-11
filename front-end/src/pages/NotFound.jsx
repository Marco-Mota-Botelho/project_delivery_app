import React from 'react';
import { BoxMessageError, ContainerNotFound, ImageError } from '../styles/NotFound';

function NotFound() {
  return (
    <ContainerNotFound>
      <BoxMessageError>
        <span>O motoboy não encontrou esse endereço, tente novamente!</span>
      </BoxMessageError>
      <ImageError />
    </ContainerNotFound>
  );
}

export default NotFound;
