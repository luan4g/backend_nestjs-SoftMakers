export abstract class UptoPostRepository {
  abstract create(
    content: string,
    likes: number,
    userId: string,
  ): Promise<void>
}