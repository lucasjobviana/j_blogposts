import React from 'react';
import { Skeleton } from '@mui/material';
import { IReactRCProps } from './IReactDom';

interface ISkeletonProps extends IReactRCProps {
  isLoading: boolean;
  children: React.ReactNode;
  variant?: 'text' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
}

export const J_Skeleton: React.FC<ISkeletonProps> = ({ isLoading, children, variant='rounded', width, height }) => {
  if(isLoading) {
    return(
      <Skeleton variant={variant} width={width} height={height}  >
        {children}
      </Skeleton>
    );
  }
  return(children);
};
