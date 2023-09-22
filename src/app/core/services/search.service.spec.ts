import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send and get search data', () => {
    const searchText = 'Test Search Text';

    // Send data
    service.sendData(searchText);

    // Get data
    let text = service.getData();

    expect(text).toBe(searchText);
  });
});
