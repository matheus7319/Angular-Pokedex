import { GenericItem } from './generic-item.model';

describe(GenericItem.name, () => {
  it('should create an instance', () => {
    expect(new GenericItem()).toBeTruthy();
  });
});
