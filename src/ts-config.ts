export class TsConfig {
	target: 'ES3' |  'ES5' |  'ES2015' |  'ES2016' |  'ES2017' | 'ES2018' | 'ESNEXT' = 'ES2017';
	module: 'none' | 'es2015'| 'ESNext' = 'none';
	strict: boolean = true;
}