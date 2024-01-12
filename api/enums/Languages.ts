/**
 * @swagger
 * components:
 *   schemas:
 *     Languages:
 *       type: string
 *       enum:
 *         - English
 *         - Polish
 *         - German
 *         - French
 *         - Spanish
 *         - Italian
 *       description: Enumeration of supported languages.
 */
export enum Languages {
	English,
	Polish,
	German,
	French,
	Spanish,
	Italian,
}
