class CloudinaryHelper {
  static transform(url, transformations) {
    if (!url || !url.includes('cloudinary.com')) return url;
  
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;
    
    return `${parts[0]}/upload/${transformations}/${parts[1]}`;
  }

  static getProfileUrl(url) {
    return this.transform(url, 'c_fill,g_face,w_400,h_400,q_auto,f_auto');
  }

  static getBannerUrl(url) {
    return this.transform(url, 'c_fill,g_center,w_1200,h_400,q_auto,f_auto');
  }
}

module.exports = CloudinaryHelper;
