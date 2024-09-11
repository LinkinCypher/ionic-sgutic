import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosCreatePage } from './create.page';

describe('UsuariosCreatePage', () => {
  let component: UsuariosCreatePage;
  let fixture: ComponentFixture<UsuariosCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
