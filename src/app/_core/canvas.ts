export function UriToBase64(uri: string, callback: Function) {
    (window as any).resolveLocalFileSystemURL(uri, resolve, reject);

    function resolve(fileEntry: any) {
        fileEntry.file(function(file: any) {
            var reader = new FileReader();
            reader.onloadend = function(e) {
                 let content = this.result;
                 callback(content);
            };
            
            // The most important point, use the readAsDatURL Method from the file plugin
            reader.readAsDataURL(file);
         });
    }

    function reject(err: any) {
        console.log('err', err);
    }
}