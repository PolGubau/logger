'use client';
import { DrawerDialog } from 'pol-ui';
import React from 'react';
import LogList from './LogList';

const ModalView = () => {
  return (
    <>
      <DrawerDialog label="Open">
        <LogList />
      </DrawerDialog>
    </>
  );
};

export default ModalView;
