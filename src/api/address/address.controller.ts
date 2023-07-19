import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiTags('address')
  @Get('/provinces')
  async getProvinces() {
    return this.addressService.getProvinces();
  }

  @ApiTags('address')
  @Get('/districts/:provinceCode')
  async getDistrictsByProvince(@Param('provinceCode') provinceCode: string) {
    return this.addressService.getDistrictsByProvince(provinceCode);
  }

  @ApiTags('address')
  @Get('/wards/:provinceCode/:districtCode')
  async getCommunesByDistrict(
    @Param('provinceCode') provinceCode: string,
    @Param('districtCode') districtCode: string,
  ) {
    return this.addressService.getCommunesByDistrict(
      provinceCode,
      districtCode,
    );
  }
}
