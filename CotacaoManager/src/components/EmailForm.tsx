import * as React from "react";
import {
  Stack,
  TextField,
  Text,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  ITextFieldStyles,
} from "@fluentui/react";
import { EmailData } from "../types";

interface EmailFormProps {
  email: EmailData | null;
  isLoading: boolean;
  error: string | null;
}

const textFieldStyles: Partial<ITextFieldStyles> = {
  field: {
    backgroundColor: "#f5f8fa",
    border: "1px solid #e1e1e1",
    borderRadius: "4px",
    padding: "8px 12px",
    fontSize: "14px",
    transition: "border-color 0.2s",
  },
  fieldGroup: {
    border: "none",
    selectors: {
      ":hover": {
        border: "1px solid #1a73e8",
      },
      ":focus-within": {
        border: "1px solid #1a73e8",
        boxShadow: "0 0 0 2px rgba(26, 115, 232, 0.2)",
      },
    },
  },
};

export const EmailForm: React.FC<EmailFormProps> = ({
  email,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return (
      <Stack horizontalAlign="center" tokens={{ childrenGap: 10 }}>
        <Spinner size={SpinnerSize.large} label="Carregando e-mail..." />
      </Stack>
    );
  }

  if (error) {
    return (
      <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
    );
  }

  if (!email) {
    return (
      <MessageBar messageBarType={MessageBarType.info}>
        Nenhum e-mail selecionado
      </MessageBar>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Text
        variant="xLarge"
        styles={{ root: { color: "#1a73e8", fontWeight: 500 } }}
      >
        Detalhes do E-mail
      </Text>

      <TextField
        label="De"
        value={email.from}
        readOnly
        multiline
        rows={1}
        styles={textFieldStyles}
      />

      <TextField
        label="Para"
        value={email.to}
        readOnly
        multiline
        rows={1}
        styles={textFieldStyles}
      />

      <TextField
        label="Assunto"
        value={email.subject}
        readOnly
        multiline
        rows={1}
        styles={textFieldStyles}
      />

      <TextField
        label="Data"
        value={new Date(email.date).toLocaleString()}
        readOnly
        multiline
        rows={1}
        styles={textFieldStyles}
      />

      <TextField
        label="Corpo do E-mail"
        value={email.body}
        readOnly
        multiline
        rows={10}
        styles={textFieldStyles}
      />
    </Stack>
  );
};
