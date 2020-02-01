import File from '../models/Files';

class FileController {
  async store(request, response) {
    const { originalname, filename } = request.file;
    const file = await File.create({
      name: originalname,
      path: filename,
    });
    return response.json(file);
  }
}
export default new FileController();
