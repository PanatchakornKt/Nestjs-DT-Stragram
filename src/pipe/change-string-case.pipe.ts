import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ChangeStringCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('data passes in poipe' + JSON.stringify(value));
    value.post_text = 'kakatang';
    return value;
  }
}
