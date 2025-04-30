import { Lock, LockOpen, TextFields } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import {
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  insertImages,
} from 'mui-tiptap';
import EditorMenuControls from './EditorMenuControls';
import useExtensions from './useExtensions';

const exampleContent = '';

function fileListToImageFiles(fileList) {
  // You may want to use a package like attr-accept
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || '').toLowerCase();
    return mimeType.startsWith('image/');
  });
}

const blobToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Extract base64 part
    };
    reader.onerror = reject;
    reader.readAsDataURL(file); // Read file directly
  });
};

export default function Editor() {
  const [submittedContent, setSubmittedContent] = useState('');
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  const extensions = useExtensions({
    placeholder: 'Add the release content here...',
  });
  const rteRef = useRef(null);

  const handleNewImageFiles = useCallback(async (files, insertPosition) => {
    if (!rteRef.current?.editor) {
      return;
    }

    const base64Files = await Promise.all(
      files.map(async (file) => {
        const base64 = await blobToBase64(file);
        return {
          src: `data:image/png;base64,${base64}`,
          alt: file.name,
        };
      })
    );

    const attributesForImageFiles = base64Files.map((file) => ({
      ...file,
    }));

    insertImages({
      images: attributesForImageFiles,
      editor: rteRef.current.editor,
      insertPosition,
    });
  }, []);

  // Allow for dropping images into the editor
  const handleDrop = useCallback(
    (view, event, _slice, _moved) => {
      if (!(event instanceof DragEvent) || !event.dataTransfer) {
        return false;
      }

      const imageFiles = fileListToImageFiles(event.dataTransfer.files);
      if (imageFiles.length > 0) {
        const insertPosition = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos;

        handleNewImageFiles(imageFiles, insertPosition);

        // Return true to treat the event as handled. We call preventDefault
        // ourselves for good measure.
        event.preventDefault();
        return true;
      }

      return false;
    },
    [handleNewImageFiles]
  );

  // Allow for pasting images
  const handlePaste = useCallback(
    (_view, event, _slice) => {
      if (!event.clipboardData) {
        return false;
      }

      const pastedImageFiles = fileListToImageFiles(event.clipboardData.files);
      if (pastedImageFiles.length > 0) {
        handleNewImageFiles(pastedImageFiles);
        // Return true to mark the paste event as handled. This can for
        // instance prevent redundant copies of the same image showing up,
        // like if you right-click and copy an image from within the editor
        // (in which case it will be added to the clipboard both as a file and
        // as HTML, which Tiptap would otherwise separately parse.)
        return true;
      }

      // We return false here to allow the standard paste-handler to run.
      return false;
    },
    [handleNewImageFiles]
  );

  return (
    <>
      <Box
        sx={{
          '& .ProseMirror': {
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
          },
        }}
      >
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          content={exampleContent}
          editable={isEditable}
          editorProps={{
            handleDrop: handleDrop,
            handlePaste: handlePaste,
          }}
          onPaste={(e) => {
            console.log(e);
          }}
          renderControls={() => <EditorMenuControls />}
          RichTextFieldProps={{
            variant: 'outlined',
            MenuBarProps: {
              hide: !showMenuBar,
            },
            footer: (
              <Stack
                direction='row'
                spacing={2}
                sx={{
                  borderTopStyle: 'solid',
                  borderTopWidth: 1,
                  borderTopColor: (theme) => theme.palette.divider,
                  py: 1,
                  px: 1.5,
                }}
              >
                <MenuButton
                  value='formatting'
                  tooltipLabel={
                    showMenuBar ? 'Hide formatting' : 'Show formatting'
                  }
                  size='small'
                  onClick={() =>
                    setShowMenuBar((currentState) => !currentState)
                  }
                  selected={showMenuBar}
                  IconComponent={TextFields}
                />

                <MenuButton
                  value='formatting'
                  tooltipLabel={
                    isEditable
                      ? 'Prevent edits (use read-only mode)'
                      : 'Allow edits'
                  }
                  size='small'
                  onClick={() => setIsEditable((currentState) => !currentState)}
                  selected={!isEditable}
                  IconComponent={isEditable ? Lock : LockOpen}
                />

                <Button
                  variant='contained'
                  size='small'
                  onClick={() => {
                    setSubmittedContent(
                      rteRef.current?.editor?.getHTML() ?? ''
                    );
                  }}
                >
                  Save
                </Button>
              </Stack>
            ),
          }}
        ></RichTextEditor>
      </Box>
      {submittedContent && (
        <>
          <pre style={{ marginTop: 10, overflow: 'auto', maxWidth: '100%' }}>
            <code>{submittedContent}</code>
          </pre>
          <Box mt={3}>
            <RichTextReadOnly
              content={`<p>Hello LDS Community. 
        Today we're bringing a new feature which aims to avoid redudant mavericks 
        being reported into the system. This was something that, mainly 
        <strong>BE OS</strong> sites reported.</p>
        <img src="https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg" />
`}
              extensions={extensions}
            />
          </Box>
        </>
      )}
    </>
  );
}
