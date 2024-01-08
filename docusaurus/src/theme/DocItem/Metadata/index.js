import React from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import stripHtml from "@site/src/utils/strip-html";

export default function DocItemMetadata() {
  const {metadata, frontMatter, assets} = useDoc();
  const sanitizedTitle = stripHtml(metadata.title);
  return (
    <PageMetadata
      title={sanitizedTitle}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}
    />
  );
}
