import React from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';

export default function DocItemMetadata() {
  const {metadata, frontMatter, assets} = useDoc();
  const sanitizedTitle = metadata.title.replace(/<a[^>]*><\/a>/g, '');
  return (
    <PageMetadata
      title={sanitizedTitle}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}
    />
  );
}
