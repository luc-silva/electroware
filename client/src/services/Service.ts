class Service {
    protected createHeader(authToken: string) {
        return {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };
    }
}

export default Service;
