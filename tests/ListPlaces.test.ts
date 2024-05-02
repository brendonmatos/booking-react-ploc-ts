import { ListPlaces } from '@/domain/usecases/ListPlaces';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('ListPlaces', () => {
  let listPlaces: ListPlaces;
  let placesServiceMock: any;

  beforeEach(() => {
    placesServiceMock = {
      list: vi.fn(),
    };
    listPlaces = new ListPlaces(placesServiceMock);
  });

  it('should call the list method of the places service', () => {
    listPlaces.execute();
    expect(placesServiceMock.list).toHaveBeenCalled();
  });
});