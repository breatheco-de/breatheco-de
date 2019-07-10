/**
 * yaml-validator
 * https://github.com/paazmaya/yaml-validator
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license.
 */
export = YamlValidator

declare class YamlValidator {
 logs: string[]
 nonValidPaths: string[]
 inValidFilesCount: number

 constructor(options?: YamlValidator.IYamlValidatorOptions)

 validate(files: string[]): void
 report(): number
}

declare namespace YamlValidator {
 export type WarningCallback = (error: Error, filePath: string) => void

 export interface IYamlValidatorOptions {
   log?: string | false
   structure?: object | false
   onWarning?: WarningCallback
   writeJson?: boolean
 }
}
