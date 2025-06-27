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
  const [fields, setFields] = React.useState({
    pesoBruto: "",
    quantity: "",
    kind: "",
    cbm: "",
    dimensao: "",
    origem: "",
    destino: "",
    cliente: "",
    produto: "",
    commodity: "",
    observacoes: "",
    incoterm: "",
    tipoCarga: "",
    temperatura: "",
    airflow: "",
    humidity: "",
    container: "",
    valorCarga: "",
  });

  React.useEffect(() => {
    if (email && email.body) {
      const body = email.body;
      const extract = (label: string, regex: RegExp) => {
        const match = body.match(regex);
        return match ? match[1].trim() : "";
      };
      setFields({
        pesoBruto:
          extract("Peso Bruto", /Peso Bruto:?\s*([\d.,]+)/i) ||
          extract("Gross Weight", /Gross Weight:?\s*([\d.,]+)/i),
        quantity:
          extract("Quantity", /Quantidade de Volume:?\s*([\w., ]+)/i) ||
          extract("Quantity", /Quantity of packages\s*([\w., ]+)/i),
        kind:
          extract("Kind", /Tipo de Volume:?\s*([\w., ]+)/i) ||
          extract("Kind", /Kind of packages.*?\s*([\w., ]+)/i),
        cbm: extract("CBM", /CBM:?\s*([\d.,]+)/i),
        dimensao:
          extract("Dimensao", /Dimens[õo]es? por Volume:?\s*([\w./ N/A]+)/i) ||
          extract(
            "Dimensao",
            /Dimensions of the packages \(cm\)\s*([\w.* ]+)/i
          ),
        origem:
          extract("Origem", /Aeroporto de Origem:?\s*([\w., -]+)/i) ||
          extract("Origem", /Origem:?\s*([\w., -]+)/i),
        destino:
          extract("Destino", /Aeroporto de Destino:?\s*([\w., -]+)/i) ||
          extract("Destino", /Destino:?\s*([\w., -]+)/i),
        cliente: extract("Cliente", /Cliente:?\s*([\w., -]+)/i),
        produto: extract("Produto", /Produto:?\s*([\w., -]+)/i),
        commodity: extract("Commodity", /Commodity:?\s*([\w., -]+)/i),
        observacoes: extract("Observações", /Observações:?\s*([\w., -]+)/i),
        incoterm: extract("Incoterm", /Incoterm:?\s*([\w., -]+)/i),
        tipoCarga:
          extract("Tipo Carga", /Tipo de Cotação:?\s*([\w., ()-]+)/i) ||
          extract("Tipo Carga", /Tipo Carga:?\s*([\w., -]+)/i),
        temperatura: extract("Temperatura", /Temperatura:?\s*([\w., -]+)/i),
        airflow: extract("Airflow", /Airflow:?\s*([\w., -]+)/i),
        humidity: extract("Humidity", /Humidity:?\s*([\w., -]+)/i),
        container: extract("Container", /Container:?\s*([\w., -]+)/i),
        valorCarga: extract("Valor da Carga", /Valor da Carga:?\s*([\d.,]+)/i),
      });
    }
  }, [email]);

  const handleFieldChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

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
    <>
      <Stack tokens={{ childrenGap: 15 }}>
        <Text
          variant="xLarge"
          styles={{ root: { color: "#1a73e8", fontWeight: 400 } }}
        >
          Detalhes da Cotação
        </Text>

        <TextField
          label="Peso Bruto (kg)"
          value={fields.pesoBruto}
          onChange={(_, v) => handleFieldChange("pesoBruto", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Quantity of Packages"
          value={fields.quantity}
          onChange={(_, v) => handleFieldChange("quantity", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Kind of Packages"
          value={fields.kind}
          onChange={(_, v) => handleFieldChange("kind", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="CBM (m3)"
          value={fields.cbm}
          onChange={(_, v) => handleFieldChange("cbm", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Dimensão (cm)"
          value={fields.dimensao}
          onChange={(_, v) => handleFieldChange("dimensao", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Origem"
          value={fields.origem}
          onChange={(_, v) => handleFieldChange("origem", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Destino"
          value={fields.destino}
          onChange={(_, v) => handleFieldChange("destino", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Cliente"
          value={fields.cliente}
          onChange={(_, v) => handleFieldChange("cliente", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Produto"
          value={fields.produto}
          onChange={(_, v) => handleFieldChange("produto", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Commodity"
          value={fields.commodity}
          onChange={(_, v) => handleFieldChange("commodity", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Observações"
          value={fields.observacoes}
          onChange={(_, v) => handleFieldChange("observacoes", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Incoterm"
          value={fields.incoterm}
          onChange={(_, v) => handleFieldChange("incoterm", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Tipo Carga"
          value={fields.tipoCarga}
          onChange={(_, v) => handleFieldChange("tipoCarga", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Temperatura"
          value={fields.temperatura}
          onChange={(_, v) => handleFieldChange("temperatura", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Airflow"
          value={fields.airflow}
          onChange={(_, v) => handleFieldChange("airflow", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Humidity"
          value={fields.humidity}
          onChange={(_, v) => handleFieldChange("humidity", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Container"
          value={fields.container}
          onChange={(_, v) => handleFieldChange("container", v || "")}
          styles={textFieldStyles}
        />
        <TextField
          label="Valor da Carga"
          value={fields.valorCarga}
          onChange={(_, v) => handleFieldChange("valorCarga", v || "")}
          styles={textFieldStyles}
        />
      </Stack>
      <Stack horizontalAlign="center" style={{ marginTop: 30 }}>
        <button
          style={{
            background: "linear-gradient(90deg, #1a73e8 60%, #174ea6 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 32px",
            fontSize: 18,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(26,115,232,0.10)",
            transition: "background 0.2s",
          }}
          disabled={false}
        >
          Abrir Cotação
        </button>
      </Stack>
    </>
  );
};
