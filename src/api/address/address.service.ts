import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AddressService {
  private addressData: any;

  constructor() {
    this.loadAddressData();
  }

  private loadAddressData() {
    const rawdata = fs.readFileSync('uploads/vna.json', 'utf8');
    this.addressData = JSON.parse(rawdata);
  }

  getProvinces() {
    return this.addressData.map((province) => {
      return { Name: province.name, Code: province.codename };
    });
  }

  getDistrictsByProvince(Code: string) {
    const province = this.addressData.find((p) => p.codename === Code);
    return province
      ? province.districts.map((district) => {
          return { Name: district.name, Code: district.codename };
        })
      : [];
  }

  getCommunesByDistrict(provinceCode: string, districtCode: string) {
    const province = this.addressData.find((p) => p.codename === provinceCode);
    if (province) {
      const district = province.districts.find(
        (d) => d.codename === districtCode,
      );
      return district
        ? district.wards.map((commune) => {
            return { Name: commune.name, Code: commune.codename };
          })
        : [];
    }
    return [];
  }
}
