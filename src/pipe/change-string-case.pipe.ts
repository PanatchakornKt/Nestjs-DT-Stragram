import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
//import * as changeCase from 'change-case';

@Injectable()
export class ChangeStringCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('data passes in poipe' + JSON.stringify(value));
    //value.post_text = changeCase.sentenceCase(value.post_text);
    return value;
  }
}
