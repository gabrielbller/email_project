import * as React from "react";
import { Stack, DefaultButton, Text } from "@fluentui/react";
import { OutlookService } from "../services/outlook";
import { EmailData } from "../types";
import { EmailForm } from "./EmailForm";

interface AppState {
  currentEmail: EmailData | null;
  emailError: string | null;
  isLoading: boolean;
}

export class App extends React.Component<{}, AppState> {
  private outlookService: OutlookService;

  constructor(props: {}) {
    super(props);
    this.outlookService = OutlookService.getInstance();

    this.state = {
      currentEmail: null,
      emailError: null,
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.loadCurrentEmail();
  }

  private async loadCurrentEmail() {
    this.setState({ isLoading: true, emailError: null });
    try {
      const email = await this.outlookService.getCurrentEmail();
      this.setState({ currentEmail: email });
    } catch (error) {
      this.setState({
        emailError:
          error instanceof Error ? error.message : "Erro ao carregar e-mail",
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <div className="logo">
            <div className="logo-text">
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: 0.5,
                  textShadow: "0 1px 4px rgba(0,0,0,0.10)",
                }}
              >
                Gerador de Cotações Automáticas
              </span>
              <br />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "#e3e8f0",
                  letterSpacing: 0.2,
                }}
              >
                Grupo Quattuor
              </span>
            </div>
          </div>
        </div>

        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { padding: 15 } }}>
          <DefaultButton
            text="Atualizar E-mail"
            onClick={() => this.loadCurrentEmail()}
            styles={{
              root: { marginBottom: 20 },
              label: { fontWeight: 500 },
            }}
          />

          <EmailForm
            email={this.state.currentEmail}
            isLoading={this.state.isLoading}
            error={this.state.emailError}
          />
        </Stack>
      </div>
    );
  }
}
