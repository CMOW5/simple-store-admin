# ImagePicker

##this component provides an interface to pick a list of images from disk

##usage

-- import the component 

1. import ImagePicker from '/component_path/ImagePicker;
2. use it in the template 

  <ImagePicker></ImagePicker>

3. the image picker triggers an onImagesLoaded event every time
   a group of images are selected or deleted

  onImagesLoaded(files)

  :files = an array of Files objects containing all the files
           selected  

  e.g => 

  <ImagePicker onImagesLoaded={handleImageUpload}></ImagePicker>