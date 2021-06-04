export class Urls {


    // private uri = 'http://localhost:20204/clientRevenueCollection/api';

    private uri = 'http://197.220.114.46:20204/clientRevenueCollection/api';

    // private servletUri = 'http://localhost:20204/DCParkingInfo';

    private servletUri = 'http://197.220.114.46:20202/DCParkingInfo';

    get url(): string {
        return this.uri;
    }

    get servletUrl(): string {
        return this.servletUri;
    }


}
