import { BrowserWindow } from 'electron'
import fs from 'fs'
import path from 'path'
import {isDarwinPlatform} from "../utils/utils";

export const inject = (mw: BrowserWindow) => {
    const platform = isDarwinPlatform() ? 'macos' : null
    mw.webContents.insertCSS(
        fs.readFileSync(
            path.resolve(`${path.dirname(require.main!.filename)}/../assets/css/style.css`), 'utf8'
        )
    )

    if (platform) {
        mw.webContents.insertCSS(
            fs.readFileSync(
                path.resolve(`${path.dirname(require.main!.filename)}/../assets/css/style.${platform}.css`), 'utf8'
            )
        )
    }
}