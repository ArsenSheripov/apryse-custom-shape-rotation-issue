import { CheckToolbarButton } from 'entities/viewer/annotations/check/ui/check-toolbar-button/check-toolbar-button';
import { RectangleToolbarButton } from 'entities/viewer/annotations/rectangle/ui/rectangle-toolbar-button/rectangle-toolbar-button';
import { StarToolbarButton } from 'entities/viewer/annotations/star/ui/star-toolbar-button/star-toolbar-button';
import { useRef } from 'react';
import { useApryseInitialization } from 'widgets/document-editor/lib/hooks/use-apryse-initialization';

export const DocumentContent = () => {
  const viewer = useRef<HTMLDivElement>(null);
  const scrollView = useRef<HTMLDivElement>(null);

  useApryseInitialization({viewer,scrollView,documentUrl: '/rotation_issues.pdf'});

  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <div style={{display:'flex'}} >
        <RectangleToolbarButton/>
        <CheckToolbarButton />
        <StarToolbarButton/>
      </div>

      <div id="document-scroll-view" style={{position:'absolute', top:'55px', left: 0, width: '100vw', height: 'calc(100vh - 55px)'}} ref={scrollView}>
        <div id="document-viewer" style={{width: '100%', height: '100%',margin:'0 auto'}} ref={viewer} />
      </div>
    </div>
  );
};
