import 'unplugin-icons/types/svelte'
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		export interface DefaultSession {
			user?: {
				id?: string | null
				name?: string | null
				email?: string | null
				image?: string | null
			}
			expires: ISODateString
		}
		interface Session extends DefaultSession { }
		interface Locals {
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
