import React, { ChangeEvent, Dispatch } from "react";
import ReactQuill, { Quill } from "react-quill";
import iconData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SmileIcon } from "@/shared/components/icons/smileIcon";
import { FilesIcon } from "@/shared/components/icons/filesIcon";
import { MicrophoneIcon } from "@/shared/components/icons/microphoneIcon";
import { PaperPlaneIcon } from "@/shared/components/icons/paperPlane";
import clsx from "clsx";
import { CloseIcon } from "@/shared/components/icons/closeIcon";

const Block = Quill.import("blots/block");

Block.tagName = "DIV";
Quill.register(Block, true);

function insertEmojiA(quillEditor: any, emoji: any) {
  const cursorPosition = quillEditor.getSelection().index;
  quillEditor.insertText(cursorPosition, emoji);
  quillEditor.setSelection(cursorPosition + emoji.length);
}

type FileWithImageUrl = File & { imageUrl?: string };

type TextEditorProps = {
  editorContent: string;
  onEditorStateChange: (state: any) => void;
  setFiles: Dispatch<any>;
  onSubmit: any;
};

type TextEditorState = {
  openEmoji: boolean;
  emoji: string;
  files: FileWithImageUrl[];
};

export class TextEditor extends React.Component<
  TextEditorProps,
  TextEditorState
> {
  state: TextEditorState = {
    openEmoji: false,
    emoji: "",
    files: [],
  };

  reactQuillRef: ReactQuill | null = null;
  iconRef = React.createRef<HTMLDivElement>();
  buttonRef = React.createRef<HTMLButtonElement>();
  buttonSubmitRef = React.createRef<HTMLButtonElement>();
  inputFileRef = React.createRef<HTMLInputElement>();

  modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertEmoji: () => {
          insertEmojiA(this.reactQuillRef?.getEditor(), this.state.emoji);
        },
      },
    },
    clipboard: {
      matchVisual: false,
    },
    keyboard: {
      bindings: {
        linebreak: {
          key: "Enter",
          ctrlKey: true,
          handler: (range: any, _context: any) => {
            this.reactQuillRef
              ?.getEditor()
              .clipboard.dangerouslyPasteHTML(range.index, "<p><br/></p>");
          },
        },
        preventLineBreak: {
          key: "Enter",
          handler: (range: any, context: any) => {
            this.buttonSubmitRef.current?.click();
            return;
          },
        },
      },
    },
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];
  promisedSetState = (newState: any) =>
    new Promise<void>((resolve) => this.setState(newState, resolve));

  handleAddEmoji = async (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: any[] = [];
    sym.forEach((el: string) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    await this.promisedSetState({ emoji });
    this.buttonRef.current?.click();
  };

  handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const files: FileWithImageUrl[] = this.state.files;
    Array.from(e.target.files).forEach((file: File) => {
      const imageUrl = URL.createObjectURL(file) as string;
      file.imageUrl = imageUrl;
      files.push(file);
    });

    this.setState({ files });
    this.props.setFiles(files);
  };

  handleRemoveFile = (index: number) => {
    const files = this.state.files.filter(
      (_file, fileIndex) => fileIndex !== index
    );
    if (typeof this.state.files[index].imageUrl === "string") {
      URL.revokeObjectURL(this.state.files[index].imageUrl as string);
    }
    this.setState({ files });
    this.props.setFiles(files);
  };

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmit();
          this.setState({ files: [] });
        }}
        className="flex items-center gap-4 relative"
      >
        {this.state.openEmoji && (
          <div className="absolute z-10 -top-[400px] left-0">
            <Picker data={iconData} onEmojiSelect={this.handleAddEmoji} />
          </div>
        )}
        <div className="grow rounded-md overflow-hidden border-primary border">
          <div id="toolbar" className="bg-primary/30 text-white">
            <div className="ql-formats">
              <button className="ql-bold" />
              <button className="ql-italic" />
              <span className="ql-format-separator"></span>
              <button className="ql-underline" />
              <button className="ql-strike" />
            </div>

            <div className="ql-formats">
              <button className="ql-link" />
            </div>
            <div className="ql-formats">
              <button className="ql-list" value="ordered" />
              <button className="ql-list" value="bullet" />
            </div>
            <div className="ql-formats">
              <button className="ql-blockquote" />
            </div>
            <div className="ql-formats">
              <button className="ql-insertEmoji" ref={this.buttonRef} />
            </div>
          </div>
          <ReactQuill
            value={this.props.editorContent}
            onChange={this.props.onEditorStateChange}
            modules={this.modules}
            formats={this.formats}
            className="bg-transparent"
            placeholder="Enter your message"
            ref={(el) => {
              this.reactQuillRef = el;
            }}
          />
          {this.state.files.length > 0 && (
            <div className="px-4 pb-4 w-full flex justify-start gap-2">
              {this.state.files.map((file: FileWithImageUrl, index: number) => {
                const { type, name, imageUrl } = file;
                const generalType = type.split("/")[0];
                return (
                  <div className="h-[40px] w-fit bg-white shadow-md relative group rounded">
                    <div
                      className="absolute top-0 left-full w-[16px] h-[16px] rounded-full bg-red-400 flex justify-center items-center -translate-x-1/2 -translate-y-1/2 group-hover:visible invisible cursor-pointer"
                      onClick={() => {
                        this.handleRemoveFile(index);
                      }}
                    >
                      <CloseIcon className="fill-white h-4" />
                    </div>
                    {generalType !== "image" && (
                      <div className="p-2">
                        <span className="text-[13px] font-thin text-[#111]">
                          {name}
                        </span>
                      </div>
                    )}
                    {generalType === "image" && (
                      <div
                        className="h-[40px] w-[40px] bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div className="px-3 flex justify-between pb-3">
            <div className="flex gap-4">
              <div
                className="cursor-pointer"
                // ref={iconRef}
                onClick={() => {
                  this.setState({
                    openEmoji: !this.state.openEmoji,
                  });
                }}
              >
                <SmileIcon className="h-5 fill-primary" />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  this.inputFileRef.current?.click();
                }}
              >
                <input
                  className="hidden"
                  type="file"
                  name="files"
                  ref={this.inputFileRef}
                  onChange={this.handleSelectFile}
                  multiple
                />
                <FilesIcon className="h-5 fill-primary" />
              </div>
              <div className="cursor-pointer">
                <MicrophoneIcon className="h-5 fill-primary" />
              </div>
            </div>
            <div>
              <button
                ref={this.buttonSubmitRef}
                type="submit"
                className={clsx("cursor-pointer px-2 py-1 rounded bg-primary")}
              >
                <PaperPlaneIcon
                  className={clsx("h-3", [
                    this.props.editorContent.length === 0
                      ? "fill-[#888]"
                      : "fill-white",
                  ])}
                />
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
