import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendingMachinePage } from './vending-machine.page';

describe('VendingMachinePage', () => {
    let component: VendingMachinePage;
    let fixture: ComponentFixture<VendingMachinePage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [VendingMachinePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(VendingMachinePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
