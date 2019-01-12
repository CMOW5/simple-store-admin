# ImageEditor

##this component provides an interface to edit a list of images

##usage

-- import the component 

1. import ImageEditor from '/component_path/ImageEditor;
2. use it in the template 

  <ImageEditor
    initImages={this.state.initImages}
    onImagesLoaded={this.handleImages}
  />

3. the image editor receives 2 props

  - initImages =  the images to preload in the component, it must be
                  an object with the following structure:
                  {
                    id: 1 // an id to identify the image
                    url: 'http://via.placeholder.com/350x150' // the image url
                  }
                  
  - onImagesLoaded(newImages, idsToDelete) = 
    the callback that is called after the images are updated.
    @param newImages = an array with the new images [File, File, File, ...]
    @param idsToDelete = an array with the preloaded images ids to delete [1,2,3,..]
