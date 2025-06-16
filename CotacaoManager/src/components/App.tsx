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
            <div className="logo-icon">RC</div>
            <div className="logo-text">Gerenciador de Cotações</div>
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
