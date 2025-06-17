import React from 'react';
import { black } from '../../colors';

export type EmptyProps = {
  icon?: React.ReactNode;
  description?: React.ReactNode;
  iconOnly?: boolean
}

export const Empty = ({ icon, description, iconOnly }: EmptyProps) => {
  return (
    <div style={{
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      color: black[400],
    }}>
      <div>{icon ? icon : '❌'}</div>
      {!iconOnly && (
        <p>
          {description
            ? description
            : 'No data'}
        </p>
      )}
    </div>
  )
}

export default Empty;