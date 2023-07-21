import * as fs from 'fs';
import bcrypt from 'bcrypt';

export const getDirPath = (dirPath: any) => {
  try {
    if (!fs.existsSync(dirPath))
      fs.promises.mkdir(dirPath, { recursive: true });
    return dirPath;
  } catch (error) {
    console.log(error.message);
  }
};

export const getDatePath = () => {
  const toDate = new Date();
  return (
    toDate.getFullYear() + '' + (toDate.getMonth() + 1) + '' + toDate.getDate()
  );
};

export const detectDevice = (userAgent) => {
  let os: { name: string; version: string } | null = null;
  let browser: { name: string; version: string } | null = null;
  let device: string | null = null;

  const osRegex =
    /(windows nt|mac os x|linux|ubuntu|iphone|ipad|android) ?([\d._]*)/i;
  const osMatch = userAgent.match(osRegex);

  if (osMatch) {
    const osName = osMatch[1];
    const osVersion = osMatch[2].replace(/_/g, '.');
    os = { name: osName, version: osVersion };
  }

  const browserRegex = /(chrome|firefox|safari|opera|edge|msie)\/([\d\.]+)/i;
  const match = userAgent.match(browserRegex);

  if (match) {
    const browserName = match[1];
    const browserVersion = match[2];

    browser = { name: browserName, version: browserVersion };
  }
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|Mobile|Tablet/i;
  const isMobile = mobileRegex.test(userAgent);

  if (isMobile) {
    device = 'mobile';
  } else {
    device = 'desktop';
  }

  return { os, browser, device };
};

export const getDirPathUpload = (TableName: string) => {
  const dirPath = 'uploads/' + TableName + getDatePath();
  try {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    return dirPath;
  } catch (error) {
    console.log(error.message);
  }
};
export const encodePassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, bcrypt.genSaltSync());
};

export const passwordCompare = (
  password: string,
  passwordInDb: string,
): Promise<boolean> => bcrypt.compare(password, passwordInDb);
