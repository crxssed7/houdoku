import filesystem from './extensions/filesystem';
import mangadex from './extensions/mangadex';
import { ExtensionMetadata, PageRequesterData } from './extensions/types';

const EXTENSIONS = {
  [filesystem.METADATA.id]: filesystem,
  [mangadex.METADATA.id]: mangadex,
};

export function getSearchableExtensions() {
  const searchableExtensions = { ...EXTENSIONS };
  delete searchableExtensions[filesystem.METADATA.id];
  return searchableExtensions;
}

export function getExtensionMetadata(extensionId: number): ExtensionMetadata {
  return EXTENSIONS[extensionId].METADATA;
}

export function getSeries(extensionId: number, seriesId: string) {
  const extension = EXTENSIONS[extensionId];
  return extension
    .fetchSeries(seriesId)
    .then((response) => response.json())
    .then((data) => extension.parseSeries(data));
}

export function getChapters(extensionId: number, seriesId: string) {
  const extension = EXTENSIONS[extensionId];
  return extension
    .fetchChapters(seriesId)
    .then((response) => response.json())
    .then((data) => extension.parseChapters(data));
}

export function getPageRequesterData(extensionId: number, chapterId: string) {
  const extension = EXTENSIONS[extensionId];
  return extension
    .fetchPageRequesterData(chapterId)
    .then((response) => response.json())
    .then((data) => extension.parsePageRequesterData(data));
}

export function getPageUrls(
  extensionId: number,
  pageRequesterData: PageRequesterData
) {
  return EXTENSIONS[extensionId].getPageUrls(pageRequesterData);
}
