export class Contact {
  constructor(
    public id: string,
    public name: string,
    public mobile: string,
    public home: string,
    public avatar: string,
    public email: string,
    public address: string
  ) {

    if (!this.avatar) {
      this.avatar = 'assets/images/icon_avatar.svg';
    }
  }

}
