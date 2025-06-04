import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useMemo, useRef, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { FormControlLabel } from "@mui/material";

const LICENSE_KEY = import.meta.env.VITE_CKEDITOR_LICENSE_KEY;
const schema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  name: z.string().optional().or(z.literal("")),
  template: z.boolean().optional(),
  subject: z
    .string()
    .min(5, { message: "subject not be less than 5 chaaracters" }),
});

type FormFields = z.infer<typeof schema>;

export default function EmailClient() {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [msgdata, setmsgData] = useState<String | null>(null);

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const cloud = useCKEditorCloud({ version: "44.2.1" });

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const { ClassicEditor, editorConfig } = useMemo<any>(() => {
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    const {
      ClassicEditor,
      Alignment,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      Bold,
      Bookmark,
      Code,
      CodeBlock,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      Highlight,
      HorizontalLine,
      Indent,
      IndentBlock,
      Italic,
      Link,
      Paragraph,
      RemoveFormat,
      Strikethrough,
      Subscript,
      Superscript,
      Underline,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "removeFormat",
            "|",
            "horizontalLine",
            "link",
            "bookmark",
            "highlight",
            "blockQuote",
            "codeBlock",
            "|",
            "alignment",
            "|",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Alignment,
          AutoLink,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          Bookmark,
          Code,
          CodeBlock,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Heading,
          Highlight,
          HorizontalLine,
          Indent,
          IndentBlock,
          Italic,
          Link,
          Paragraph,
          RemoveFormat,
          Strikethrough,
          Subscript,
          Superscript,
          Underline,
        ],
        balloonToolbar: ["bold", "italic", "|", "link"],
        fontFamily: {
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
            {
              model: "heading4",
              view: "h4",
              title: "Heading 4",
              class: "ck-heading_heading4",
            },
            {
              model: "heading5",
              view: "h5",
              title: "Heading 5",
              class: "ck-heading_heading5",
            },
            {
              model: "heading6",
              view: "h6",
              title: "Heading 6",
              class: "ck-heading_heading6",
            },
          ],
        },
        initialData: "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        placeholder: "Type or paste your content here!",
      },
    };
  }, [cloud, isLayoutReady]);
  const onChangeInEditor = (event: any, editor: any) => {
    console.log(event);
    const data = editor.getData();
    setmsgData(data);
  };
  const handleChange = (file: File | null) => {
    if (file) {
      if (file.size > 2097152) {
        toast.error("file cannot be greater than 2mb");
        return;
      }
      setFile(file);
    }
  };
  const removeFile = () => {
    setFile(null);
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      template: undefined,
    },
  });
  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    setLoading(true);
    if (!msgdata) return;
    if (msgdata.length < 20) {
      toast.error("message too short");
      return;
    }

    const payload = new FormData();
    payload.append("name", data.name || "");
    payload.append("subject", data.subject);
    payload.append("email", data.email || "");
    payload.append("template", String(data.template) || "");
    payload.append("message", String(msgdata));

    if (file) payload.append("txtfile", file);

    axios
      .post("/api/mail", payload)
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          toast.success("Mail(s) Successfully Delivered");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("ERR - ", err);
        if (err.response) {
          err.response.data.length < 45
            ? toast.error(err.response.data)
            : toast.error("something went wrong");
        } else {
          toast.error("ERR server issue");
        }
      });
  };

  return (
    <div>
      <div className="notify-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6">
              <TextField
                label="Recipient Name"
                placeholder="field is optional"
                fullWidth
                margin="normal"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </div>
            <div className="col-lg-6">
              <TextField
                label="Recipient Email"
                placeholder="field is optional when using txt file"
                fullWidth
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </div>
            <div className="col-lg-6">
              <MuiFileInput
                sx={{ width: "100%", height: "3.5em", marginTop: "10px" }}
                size="small"
                value={file}
                variant="outlined"
                placeholder="For multiple emails (.txt only)"
                onChange={handleChange}
                clearIconButtonProps={{
                  title: "Remove",
                  children: <CloseIcon fontSize="small" onClick={removeFile} />,
                }}
                InputProps={{
                  inputProps: {
                    accept: ".txt",
                  },
                  startAdornment: <TextSnippetIcon />,
                }}
              />
            </div>
            <div className="col-lg-6">
              <TextField
                label="Subject"
                fullWidth
                margin="normal"
                {...register("subject")}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
            </div>
            <div className="col-lg-4">
              <Controller
                name="template"
                control={control}
                // defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    sx={{ marginTop: "16px", marginBottom: "8px" }}
                    control={
                      <Switch
                        checked={field.value === true}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Use Company Template"
                  />
                )}
              />
            </div>
            <div className="col-lg-12">
              <div className="main-container">
                <div
                  className="editor-container editor-container_classic-editor"
                  ref={editorContainerRef}
                >
                  <div className="editor-container__editor">
                    <div ref={editorRef}>
                      {ClassicEditor && editorConfig && (
                        <CKEditor
                          editor={ClassicEditor}
                          config={editorConfig}
                          onChange={(event, editor) =>
                            onChangeInEditor(event, editor)
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <button
                type="submit"
                className="btn btn-customx mt-3 py-2 px-4"
                disabled={loading}
              >
                {loading ? "Sending..." : "Confirm"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
