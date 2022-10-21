export default class {
  public async getMetaOfWebsite(url: string) {
    const result = await fetch(
      encodeURI(
        "http://getwebsitemeta.smark.1149571478162300.cn-hangzhou.fc.devsapp.net?url=https://www.baidu.com/"
      )
    );

    console.log(await result.json());
  }
}
