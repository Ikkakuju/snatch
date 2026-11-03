import { AlertCircle, RefreshCw } from "lucide-react";
import { Component, type ReactNode } from "react";
import { Sentry } from "../lib/sentry";

interface Props {
	children: ReactNode;
	/** Localized copy; the class itself cannot use the i18n hook. */
	labels?: {
		title?: string;
		retry?: string;
		reload?: string;
		details?: string;
		fallbackMessage?: string;
	};
}

interface State {
	hasError: boolean;
	error?: Error;
	errorInfo?: React.ErrorInfo;
}

/** Catches render errors so one broken component does not blank the app. */
export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
		this.setState({ errorInfo });
	}

	handleReset = (): void => {
		this.setState({ hasError: false, error: undefined, errorInfo: undefined });
	};

	handleReload = (): void => {
		window.location.reload();
	};

	render(): ReactNode {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
					<div className="max-w-md w-full space-y-6 text-center">
						<div className="flex justify-center">
							<div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
								<AlertCircle className="w-8 h-8 text-red-500" />
							</div>
						</div>

						<div className="space-y-2">
							<h1 className="text-2xl font-bold text-white">
								{this.props.labels?.title ?? "Something went wrong"}
							</h1>
							<p className="text-gray-400">
								{this.state.error?.message ||
									this.props.labels?.fallbackMessage ||
									"An unexpected error occurred. Please try again."}
							</p>
						</div>

						{import.meta.env.DEV && this.state.error && (
							<details className="text-left bg-white/5 rounded-lg p-4 border border-white/10">
								<summary className="cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
									{this.props.labels?.details ?? "Error details"}
								</summary>
								<pre className="mt-3 text-xs text-red-400 overflow-auto max-h-40 whitespace-pre-wrap">
									{this.state.error.toString()}
									{this.state.errorInfo?.componentStack}
								</pre>
							</details>
						)}

						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<button
								type="button"
								onClick={this.handleReset}
								className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
							>
								<RefreshCw className="w-4 h-4" />
								{this.props.labels?.retry ?? "Try again"}
							</button>
							<button
								type="button"
								onClick={this.handleReload}
								className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-medium transition-all duration-200"
							>
								{this.props.labels?.reload ?? "Reload page"}
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
