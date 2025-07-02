import React from 'react';
import Image from 'next/image';

export interface AppImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const AppImage: React.FC<AppImageProps> = ({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      layout="fill"
      objectFit="cover"
      {...props}
    />
  );
};

export default AppImage;
