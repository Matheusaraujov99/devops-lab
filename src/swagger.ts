import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Laboratórios",
    version: "1.0.0",
    description: "API completa de CRUD de Laboratórios com autenticação JWT"
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{ bearerAuth: [] }],
  paths: {
    "/auth/login": {
      post: {
        summary: "Login de usuário",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  senha: { type: "string" }
                },
                required: ["email", "senha"],
                example: { email: "admin@faculdade.com", senha: "123456" }
              }
            }
          }
        },
        responses: {
          200: { description: "Token JWT gerado com sucesso" },
          401: { description: "Credenciais inválidas" }
        }
      }
    },
    "/labs": {
      get: {
        summary: "Listar todos os laboratórios",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Lista retornada" } }
      },
      post: {
        summary: "Criar novo laboratório",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  capacidade: { type: "integer" },
                  localizacao: { type: "string" }
                },
                required: ["nome", "capacidade", "localizacao"],
                example: { nome: "Lab X", capacidade: 25, localizacao: "Bloco A" }
              }
            }
          }
        },
        responses: { 201: { description: "Laboratório criado" } }
      }
    },
    "/labs/{id}": {
      get: {
        summary: "Buscar laboratório por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 200: { description: "Laboratório encontrado" }, 404: { description: "Não encontrado" } }
      },
      put: {
        summary: "Atualizar laboratório",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  capacidade: { type: "integer" },
                  localizacao: { type: "string" }
                },
                example: { nome: "Lab Atualizado", capacidade: 30, localizacao: "Bloco B" }
              }
            }
          }
        },
        responses: { 200: { description: "Laboratório atualizado" }, 404: { description: "Não encontrado" } }
      },
      delete: {
        summary: "Excluir laboratório",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 204: { description: "Excluído com sucesso" }, 404: { description: "Não encontrado" } }
      }
    }
  }
};

export default function setupSwagger(app: Express) {
  app.get("/api-docs/swagger.json", (_req, res) => res.json(swaggerDocument));
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: true, swaggerOptions: { persistAuthorization: true } })
  );
  console.log("[swagger] API Docs atualizada em /api-docs");
}