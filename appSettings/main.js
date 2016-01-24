
 
import appContentComponent from './components/main/main';


    Wix.UI.initialize({
      numOfImages: 10,
      isIconShown: true,
      imageVisibility: 'show',
      imagesToSync: 0,
      imageMeta: true,
      imageAlt: false,
      imageLink: false
    });

    Wix.UI.onChange('*', function() {
      Wix.Settings.triggerSettingsUpdatedEvent('updated', Wix.Utils.getOrigCompId());
    });